from django.db import models
from decimal import Decimal
import random
from django.contrib.auth.models import User

def random_cost():
    return Decimal(random.randint(1, 1000))  # Generates a random integer between 1 and 1000 and converts it to a Decimal

from openai import OpenAI
client = OpenAI(api_key="") #insert api key to be used


def chat(prompt):
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {
                "role": "user",
                "content": prompt + "limit the response to 50 words"
            }
        ]
    )

    #print(completion['choices'][0]['message']['content'])

    return(completion.choices[0].message.content)

class Book(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    bookTitle = models.CharField(max_length=50)
    

    def __str__(self):
        return self.bookTitle
    
    @property
    def release_year(self):
        return chat(self.bookTitle + " give me a definition for this word within 20 words")
