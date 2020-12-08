from mongoengine import DynamicDocument, fields


class StreamingHistory(DynamicDocument):
    artistName = fields.StringField(null=False)
    endTime = fields.DateTimeField(null=False)
    msPlayed = fields.IntField(null=False)
    trackName = fields.StringField(null=False)
    trackId = fields.StringField()
    userId = fields.IntField(null=False)

    meta = {
        "collection": "streaming_history"
    }
