import os
import shutil
import json
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, lower

# Chemins des fichiers
songLyricsPath = "test1.csv"
spotifyYoutubePath = "test2.csv"
dataPath = "data_output"

# Initialisation de la session Spark
spark = SparkSession.builder.appName("Songs Create JSON").getOrCreate()

# Lecture des fichiers CSV
df_lyrics = spark.read.csv(songLyricsPath, header=True, inferSchema=True)
df_spotify = spark.read.csv(spotifyYoutubePath, header=True, inferSchema=True)

# Harmonisation des noms (par exemple, pour le titre de la chanson)
df_lyrics = df_lyrics.withColumn("title", lower(col("title")))
df_spotify = df_spotify.withColumn("Title", lower(col("Title")))

# Jointure des deux DataFrames sur le titre de la chanson
df_joined = df_lyrics.join(df_spotify, lower(col("title")) == lower(col("Title")), "inner").drop("Title")

# Nom du fichier de sortie basé sur le nom du fichier source
input_file_name = os.path.splitext(os.path.basename(songLyricsPath))[0]

# Chemin temporaire pour sauver le fichier
temp_output_path = "temp_output"
df_joined.coalesce(1).write.csv(temp_output_path, mode="overwrite", header=True)

# Trouver le fichier CSV créé
temp_file = [f for f in os.listdir(temp_output_path) if f.endswith(".csv")][0]

# Collecter les résultats sous forme de liste de dictionnaires
results = df_joined.collect()

# Création du chemin final pour le fichier
final_output_path = f"{dataPath}/{input_file_name}.json"

# Écriture dans un fichier JSON
with open(final_output_path, 'w') as json_file:
    json_file.write('[')  # Début du tableau JSON
    for i, row in enumerate(results):
        json.dump(row.asDict(), json_file)  # Conversion en dictionnaire
        if i < len(results) - 1:
            json_file.write(',')  # Ajouter une virgule entre les objets
    json_file.write(']')  # Fin du tableau JSON

# Nettoyage du répertoire temporaire
shutil.rmtree(temp_output_path)

# Arrêt de la session Spark
spark.stop()
