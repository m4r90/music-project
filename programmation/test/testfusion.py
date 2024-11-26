from pyspark.sql import SparkSession

# Initialiser la session Spark
spark = SparkSession.builder.appName("FusionCSV").getOrCreate()

# Charger les deux fichiers CSV
df1 = spark.read.option("header", "true").csv("test1.csv")
df2 = spark.read.option("header", "true").csv("test2.csv")

# Renommer les colonnes de df2 pour éviter les conflits avec df1
df2 = df2.withColumnRenamed("Artist", "Artist_2") \
         .withColumnRenamed("Url_spotify", "Url_spotify_2") \
         .withColumnRenamed("Track", "Track_2") \
         .withColumnRenamed("Album", "Album_2") \
         .withColumnRenamed("Album_type", "Album_type_2") \
         .withColumnRenamed("Uri", "Uri_2") \
         .withColumnRenamed("Danceability", "Danceability_2") \
         .withColumnRenamed("Energy", "Energy_2") \
         .withColumnRenamed("Key", "Key_2") \
         .withColumnRenamed("Loudness", "Loudness_2") \
         .withColumnRenamed("Speechiness", "Speechiness_2") \
         .withColumnRenamed("Acousticness", "Acousticness_2") \
         .withColumnRenamed("Instrumentalness", "Instrumentalness_2") \
         .withColumnRenamed("Liveness", "Liveness_2") \
         .withColumnRenamed("Valence", "Valence_2") \
         .withColumnRenamed("Tempo", "Tempo_2") \
         .withColumnRenamed("Duration_ms", "Duration_ms_2") \
         .withColumnRenamed("Url_youtube", "Url_youtube_2") \
         .withColumnRenamed("Title", "Title_2") \
         .withColumnRenamed("Channel", "Channel_2") \
         .withColumnRenamed("Views", "Views_2") \
         .withColumnRenamed("Likes", "Likes_2") \
         .withColumnRenamed("Comments", "Comments_2") \
         .withColumnRenamed("Description", "Description_2") \
         .withColumnRenamed("Licensed", "Licensed_2") \
         .withColumnRenamed("official_video", "official_video_2") \
         .withColumnRenamed("Stream", "Stream_2")

# Fusionner les DataFrames sur la colonne 'title' et 'Title'
merged_df = df1.join(df2, df1.title == df2.Title_2, "inner").drop(df2.Title_2)

# Sauvegarder le DataFrame fusionné dans un nouveau fichier CSV
merged_df.write.option("header", "true").csv("merged_result.csv")

# Afficher un échantillon du résultat
merged_df.show()

# Arrêter la session Spark
spark.stop()
