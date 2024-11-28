from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd

def vectorize_lyrics(file_path):
    df = pd.read_csv(file_path)
    vectorizer = TfidfVectorizer(max_features=5000)  # Créer le vectorizer
    X = vectorizer.fit_transform(df['cleaned_lyrics'])  # Transformation des paroles
    return X, vectorizer  # Retourne à la fois les caractéristiques et le vectorizer

if __name__ == "__main__":
    X, vectorizer = vectorize_lyrics('preprocessed_data_riged.csv')
    pd.DataFrame(X.toarray(), columns=vectorizer.get_feature_names_out()).to_csv('vectorized_data-2.csv', index=False)  # Sauvegarder les données vectorisées

    # Sauvegarder le vectorizer dans un fichier
    import joblib
    joblib.dump(vectorizer, 'tfidf_vectorizer.pkl')
    print("Vectorizer sauvegardé dans 'tfidf_vectorizer.pkl'")
