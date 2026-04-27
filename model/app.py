from fastapi import FastAPI
import joblib
import numpy as np
from pydantic import BaseModel

app = FastAPI()
model = joblib.load("gradient_boosting_model.pkl")

class PredictRequest(BaseModel):
    home_stats: list
    away_stats: list

@app.post("/predict")
def predict(req: PredictRequest):
    features = np.array([req.home_stats + req.away_stats])
    proba = model.predict_proba(features)[0]
    return {
        "home_win": round(float(proba[0]), 3),
        "draw": round(float(proba[1]), 3),
        "away_win": round(float(proba[2]), 3)
    }
