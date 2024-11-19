# Import necessary libraries
from flask import Flask, jsonify
from pyspark.sql import SparkSession
from flask_cors import CORS
from pyspark.storagelevel import StorageLevel

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)

# Initialize a SparkSession with optimized configurations
spark = SparkSession.builder \
    .appName("SongLyricsProcessing") \
    .config("spark.driver.memory", "8g") \
    .config("spark.executor.memory", "8g") \
    .config("spark.driver.maxResultSize", "4g") \
    .getOrCreate()

# Set Spark log level to reduce noise
spark.sparkContext.setLogLevel("ERROR")

# Load CSV file once into a global Spark DataFrame
data_file = "song_lyrics.csv"
df = spark.read.option("multiline", "true") \
    .option("quote", '"') \
    .option("escape", '"') \
    .option("escape", '\\') \
    .option("delimiter", ",") \
    .option("header", "true") \
    .option("inferSchema", "true") \
    .csv(data_file)

# Optimize partitioning
df = df.repartition(10)  # Reduce the number of partitions for better memory management

# Cache the data using a more efficient persistence level
df.persist(StorageLevel.DISK_ONLY)  # Use disk storage if memory is insufficient


@app.route('/songs', methods=['GET'])
def get_songs():
    """
    Return the first 10 songs from the dataset in JSON format.
    """
    try:
        # Select only necessary columns and limit to 10 rows
        sample_data = df.select("title", "artist", "year", "lyrics") \
            .limit(10) \
            .toJSON() \
            .take(10)  # Use take instead of collect to avoid memory overload
        print(sample_data)
        return jsonify(sample_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/health', methods=['GET'])
def health_check():
    """
    Return a health check status.
    """
    return jsonify({"status": "running"}), 200


# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True, port=5000)
