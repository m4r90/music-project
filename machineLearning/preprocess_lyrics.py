# preprocess_lyrics.py
import pandas as pd
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

nltk.download('punkt')
nltk.download('stopwords')

def preprocess_lyrics(lyrics):
    tokens = word_tokenize(lyrics)
    stop_words = set(stopwords.words('english'))
    filtered_tokens = [word for word in tokens if word not in stop_words]
    return ' '.join(filtered_tokens)

def load_and_preprocess_data(file_path):
    df = pd.read_csv(file_path)
    df['cleaned_lyrics'] = df['lyrics'].apply(preprocess_lyrics)
    return df

if __name__ == "__main__":
    df = load_and_preprocess_data('preprocessed_data.csv')
    df.to_csv('preprocessed_lyrics.csv', index=False)  # Sauvegarde des données prétraitées
