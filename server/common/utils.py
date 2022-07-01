import json
import uuid

theatre = json.load(open("./common/mock/theatre.json"))
movies = json.load(open("./common/mock/movies.json"))

# for movie in movies["data"]:
#     movie["id"] = str(uuid.uuid4())
# # print(movies)
# # print(json.dumps(movies, indent=4))
# with open("./common/mock/movies.json", "w") as outfile:
#     outfile.write(json.dumps(movies, indent=4))
