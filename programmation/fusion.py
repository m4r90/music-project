import os
import shutil
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, lower

# Désactiver les bibliothèques Hadoop natives pour Windows
spark = SparkSession.builder.appName("Fusion CSV").getOrCreate()
spark.conf.set("spark.hadoop.fs.file.impl", "org.apache.hadoop.fs.LocalFileSystem")

# Chemins des fichiers
song_lyrics_path = "test/test1.csv"
spotify_youtube_path = "test/test2.csv"
dataPath = "test/data_output"  # Répertoire où vous voulez sauvegarder le fichier final

# Vérifier si le répertoire de sortie existe, sinon le créer
if not os.path.exists(dataPath):
    os.makedirs(dataPath)

# Lecture des fichiers CSV
df_lyrics = spark.read.csv(song_lyrics_path, header=True, inferSchema=True)
df_spotify = spark.read.csv(spotify_youtube_path, header=True, inferSchema=True)

# Harmonisation des noms pour la jointure (mettre en minuscules pour éviter les problèmes de casse)
df_lyrics = df_lyrics.withColumn("title", lower(col("title"))).withColumn("artist", lower(col("artist")))
df_spotify = df_spotify.withColumn("title", lower(col("Title"))).withColumn("artist", lower(col("Artist")))

# Renommer les colonnes conflictuelles (comme "views")
df_lyrics = df_lyrics.withColumnRenamed("views", "lyrics_views").withColumnRenamed("id", "song_lyrics_id")
df_spotify = df_spotify.withColumnRenamed("Views", "spotify_views").withColumnRenamed("id", "spotify_id")

# Jointure des deux DataFrames sur 'title' et 'artist'
df_joined = df_lyrics.join(df_spotify, on=["title", "artist"], how="inner")

# Nom du fichier de sortie basé sur le nom du fichier source
input_file_name = os.path.splitext(os.path.basename(song_lyrics_path))[0]

# Chemin temporaire pour sauver le fichier
temp_output_path = "temp_output"

# Vérifier si le répertoire temporaire existe, sinon le créer
if os.path.exists(temp_output_path):
    shutil.rmtree(temp_output_path)  # Si le répertoire existe déjà, le supprimer

# Sauvegarde des données dans un répertoire temporaire
df_joined.coalesce(1).write.option("header", "true").csv(temp_output_path, mode="overwrite")

# Trouver le fichier CSV créé dans le répertoire temporaire
temp_file = [f for f in os.listdir(temp_output_path) if f.startswith("part-")][0]

# Déplacer le fichier créé dans le répertoire de destination final
final_output_path = f"{dataPath}/{input_file_name}.csv"
shutil.move(os.path.join(temp_output_path, temp_file), final_output_path)

# Nettoyage du répertoire temporaire
shutil.rmtree(temp_output_path)

print(f"Fusion réussie ! Fichier enregistré à : {final_output_path}")

# Arrêt de la session Spark
spark.stop()
