import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer

def vectorize_lyrics(file_path):
    df = pd.read_csv(file_path)
    vectorizer = TfidfVectorizer(max_features=5000)
    X = vectorizer.fit_transform(df['cleaned_lyrics'])
    return X, vectorizer

if __name__ == "__main__":
    X, vectorizer = vectorize_lyrics('preprocessed_data.csv')
    pd.DataFrame(X.toarray(), columns=vectorizer.get_feature_names_out()).to_csv('vectorized_data-2.csv', index=False)
