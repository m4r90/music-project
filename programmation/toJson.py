from pyspark.sql import SparkSession

# Créer une session Spark avec une configuration sans Hadoop
spark = SparkSession.builder \
    .appName("CSV to JSON") \
    .config("spark.sql.files.ignoreCorruptFiles", "true") \
    .config("spark.hadoop.fs.file.impl", "org.apache.hadoop.fs.LocalFileSystem") \
    .getOrCreate()

# Charger le fichier CSV
df = spark.read.option("header", "true").csv("Spotify_YouTube.csv")

# Convertir en JSON et sauvegarder dans un fichier local
df.write.format("json").save("sortie.json")

# Optionnel : si vous souhaitez afficher les données converties
df.show()

# Arrêter la session Spark
spark.stop()
