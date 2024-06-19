from datetime import datetime

def get_date_time_from_timestamp(timestamp_str):
    timestamp = datetime.fromisoformat(timestamp_str.replace("Z", "+00:00"))
    
    date = timestamp.date()
    time = timestamp.time()

    return date.isoformat(), time.isoformat()