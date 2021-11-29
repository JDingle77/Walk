from django.contrib import admin

from .models import Route, Pee, Poop, Interaction, Drink

admin.site.register(Route)
admin.site.register(Pee)
admin.site.register(Poop)
admin.site.register(Interaction)
admin.site.register(Drink)
