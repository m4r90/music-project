import pandas as pd

def load_and_prepare_data():
    vectorized_data = pd.read_csv('vectorized_data.csv')  # Données vectorisées
    preprocessed_data = pd.read_csv('preprocessed_data_riged.csv')  # Données prétraitées

    vectorized_data['encoded_tag'] = preprocessed_data['encoded_tag']

    print(vectorized_data.head())
    return vectorized_data

if __name__ == "__main__":
    data = load_and_prepare_data()
