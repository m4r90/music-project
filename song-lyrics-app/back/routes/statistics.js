const express = require('express');
const Song = require('../model/Song'); // Importation du modèle Song
const router = express.Router();

// Route pour obtenir les statistiques des genres musicaux avec pagination
router.get('/genres', async (req, res) => {
    const pageNumber = parseInt(req.query.page) || 0;
    const pageSize = parseInt(req.query.size) || 100;

    try {
        // Agrégation pour compter les chansons par genre avec pagination
        const genreData = await Song.aggregate([
            { $group: { _id: "$tag", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $skip: pageNumber * pageSize },
            { $limit: pageSize }
        ]).exec();

        // Formatage pour le retour
        const formattedData = genreData.map(item => ({
            genre: item._id,
            count: item.count
        }));

        res.json(formattedData);
    } catch (error) {
        console.error('Erreur lors de la récupération des genres:', error);
        res.status(500).send('Erreur lors de la récupération des genres');
    }
});

// Route pour obtenir les musiques par tranches de vues
router.get('/views', async (req, res) => {
    try {
        const viewRanges = [
            { label: '0-100', min: 0, max: 100},
            { label: '100-1000', min: 100, max: 1000 },
            { label: '1001-5000', min: 1001, max: 5000 },
            { label: '5001-10000', min: 5001, max: 10000 },
            { label: '10001-50000', min: 10001, max: 50000 },
            { label: '50001+', min: 50001, max: Number.MAX_SAFE_INTEGER },
        ];

        const queries = viewRanges.map(range => ({
            range: range.label,
            query: {
                $gte: range.min,
                $lte: range.max
            }
        }));

        const aggregatedData = await Promise.all(
            queries.map(async ({ range, query }) => {
                const count = await Song.countDocuments({ views: query });
                return { range, count };
            })
        );

        res.json(aggregatedData);
    } catch (error) {
        console.error('Erreur lors de la récupération des vues:', error);
        res.status(500).send('Erreur lors de la récupération des vues');
    }
});


// Route pour obtenir les statistiques des chansons par décennie
router.get('/decades', async (req, res) => {
    try {
        const decadesRanges = [
            { label: '1970-1979', min: 1970, max: 1979 },
            { label: '1980-1989', min: 1980, max: 1989 },
            { label: '1990-1999', min: 1990, max: 1999 },
            { label: '2000-2009', min: 2000, max: 2009 },
            { label: '2010-2019', min: 2010, max: 2019 },
            { label: '2020+', min: 2020, max: new Date().getFullYear() },
        ];

        const queries = decadesRanges.map(range => ({
            range: range.label,
            query: {
                $gte: range.min,
                $lte: range.max
            }
        }));

        const aggregatedData = await Promise.all(
            queries.map(async ({ range, query }) => {
                const count = await Song.countDocuments({ year: query });
                return { range, count };
            })
        );

        res.json(aggregatedData);
    } catch (error) {
        console.error('Erreur lors de la récupération des années de parution:', error);
        res.status(500).send('Erreur lors de la récupération des années de parution');
    }
});



module.exports = router;
