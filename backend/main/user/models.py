from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
import uuid


class UserManager(BaseUserManager):
    def create_user(self, email, password):
        # Create and return a User with email and password
        if email is None:
            raise TypeError("Users must have an email.")
        if password is None:
            raise TypeError("Users must have a password.")

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        # Create and return User with superuser permissions
        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.CharField(db_index=True, max_length=255, unique=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    is_active = models.BooleanField(default=True)  # login/logout
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password']

    objects = UserManager()  # defines user manager class for User

    def __str__(self):
        return f"{self.email}"

class Dog(models.Model):
    username = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    owner_name = models.CharField(max_length=50)

    MALE = 'Male'
    FEMALE = 'Female'
    NOT_SPECIFIED = 'Not specified'
    gender_choices = (
        (MALE,'Male'),
        (FEMALE,'Female'),
        (NOT_SPECIFIED,'Not specified')
    )
    gender = models.CharField(max_length=15,default=NOT_SPECIFIED,choices=gender_choices)
    # Note: To access the gender values, object_name.get_gender_display()

    # Optional Fields
    # =====================================================
    breed = models.CharField(max_length=30,blank=True)
    birthday = models.DateTimeField(null=True,blank=True)
    # =====================================================

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.username
