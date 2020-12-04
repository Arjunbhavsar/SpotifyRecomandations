from mongoengine import Document, fields


class Identity(Document):
    display_name = fields.StringField(required=True, null=False)
    first_name = fields.StringField()
    last_name = fields.StringField()
    image_url = fields.StringField()
    large_image_url = fields.StringField()
    taste_maker = fields.BooleanField()
    verified = fields.BooleanField()

    meta = {"collection": "identity"}

