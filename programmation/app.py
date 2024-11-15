# Import necessary libraries
from flask import Flask, jsonify
from pyspark.sql import SparkSession
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize a SparkSession
spark = SparkSession.builder \
    .appName("SongLyricsProcessing") \
    .config("spark.driver.memory", "4g") \
    .config("spark.executor.memory", "4g") \
    .getOrCreate()

# Load the CSV file into a DataFrame with proper handling of special characters
data_file = "song_lyrics.csv"
df = spark.read.option("multiline", "true") \
    .option("quote", '"') \
    .option("escape", '"') \
    .option("delimiter", ",") \
    .option("header", "true") \
    .option("inferSchema", "true") \
    .csv(data_file)

df = df.repartition(100)
pandas_df = df.toPandas()

@app.route('/songs', methods=['GET'])
def get_songs():
    # Convert the dataframe to JSON
    song_data = pandas_df.to_dict(orient='records')
    return jsonify(song_data)

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)

# Show the first few rows of the DataFrame to confirm proper loading
df.show(truncate=False)

# Optionally display the schema to verify that columns are assigned correctly
df.printSchema()

# Count the number of rows in the DataFrame
row_count = df.count()
print(f"Total number of rows: {row_count}")

# Stop the Spark session
spark.stop()
