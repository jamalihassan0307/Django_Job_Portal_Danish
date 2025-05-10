from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Role, Job, ContactDetail

admin.site.register(User, UserAdmin)
admin.site.register(Role)
admin.site.register(Job)
admin.site.register(ContactDetail)
