import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import re
from sklearn.utils import resample

# Télécharger les ressources nécessaires de NLTK
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('punkt_tab')

# Charger les données
data = pd.read_json('songs_lyrics_en.json')

# Normaliser les données JSON
songs_data = data['songs']
songs_df = pd.json_normalize(songs_data)

print(songs_df.head())

# Supprimer les lignes manquantes ou vides
songs_df = songs_df.dropna(subset=['lyrics', 'tag'])
songs_df = songs_df[songs_df['lyrics'].str.strip() != '']

# Prétraitement des paroles
def preprocess_lyrics(lyrics):
    lyrics = lyrics.lower()
    lyrics = re.sub(r'[^a-z\s]', '', lyrics)
    tokens = word_tokenize(lyrics)
    stop_words = set(stopwords.words('english'))
    return ' '.join([word for word in tokens if word not in stop_words])

# Appliquer le prétraitement
songs_df['cleaned_lyrics'] = songs_df['lyrics'].apply(preprocess_lyrics)

# Encoder les tags
le = LabelEncoder()
songs_df['encoded_tag'] = le.fit_transform(songs_df['tag'])

# Afficher les tags et leurs encodages
print("Tags et leurs encodages :")
for tag, encoding in zip(le.classes_, range(len(le.classes_))):
    print(f"{tag}: {encoding}")

# Rééquilibrer les classes en utilisant un rééchantillonnage ajusté sans doublons exacts
class_counts = songs_df['encoded_tag'].value_counts()
min_class_size = class_counts.min()
max_class_size = class_counts.max()  # Taille de la classe majoritaire

# Taille cible pour chaque classe (choisir un seuil raisonnable sans trop suréchantillonner)
target_class_size = min_class_size + int((max_class_size - min_class_size) / 2)

# Appliquer le rééchantillonnage ajusté sans doublon exact
balanced_df = pd.DataFrame(columns=songs_df.columns)
for label in songs_df['encoded_tag'].unique():
    class_data = songs_df[songs_df['encoded_tag'] == label]

    # Si la taille de la classe est plus petite que la taille cible, augmenter la taille
    if len(class_data) < target_class_size:
        # En faire des répliques aléatoires sans dupliquer exactement
        resampled_data = resample(class_data, replace=True, n_samples=target_class_size, random_state=42)
    else:
        # Sinon, ne rien faire
        resampled_data = class_data

    balanced_df = pd.concat([balanced_df, resampled_data])

# Vérifier l'équilibre des classes après rééchantillonnage
print("Répartition des classes après rééchantillonnage ajusté :")
print(balanced_df['encoded_tag'].value_counts())

# Diviser les données en train et test
X_train, X_test, y_train, y_test = train_test_split(
    balanced_df['cleaned_lyrics'], balanced_df['encoded_tag'], test_size=0.2, random_state=42
)

# Sauvegarder les données prétraitées et équilibrées
balanced_df[['cleaned_lyrics', 'encoded_tag']].to_csv('preprocessed_data.csv', index=False)

print("Données prétraitées et rééquilibrées sauvegardées dans 'preprocessed_data_balanced_adjusted.csv'.")
