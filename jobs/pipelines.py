from django.shortcuts import render
from social_core.pipeline.partial import partial
from .models import User, Role
from django.contrib import messages

def get_avatar(backend, response, user=None, *args, **kwargs):
    """
    Get user's avatar from social provider if available
    """
    if backend.name == 'google-oauth2':
        if response.get('picture'):
            user.profile_picture = response['picture']
            user.save()

def create_user_profile(backend, user, response, *args, **kwargs):
    """
    Create user profile if it doesn't exist
    """
    # Skip if this is not a new user
    if not kwargs.get('is_new'):
        return

    try:
        # Get or create the default role (assuming 'Job Seeker' role exists)
        default_role = Role.objects.get_or_create(role_name='Job Seeker')[0]
        
        # Update user with role
        user.role = default_role
        user.save()
    except Exception as e:
        print(f"Error creating profile: {str(e)}")

def update_user_social_data(backend, user, response, *args, **kwargs):
    """
    Update user data from social provider
    """
    if backend.name == 'google-oauth2':
        if response.get('name'):
            name_parts = response['name'].split(' ', 1)
            if len(name_parts) >= 2:
                user.first_name = name_parts[0]
                user.last_name = name_parts[1]
            else:
                user.first_name = name_parts[0]
                user.last_name = ''
            
        if response.get('email'):
            user.email = response['email']
            
        user.save()

def check_email_domain(backend, response, user=None, *args, **kwargs):
    """
    Optional: Check email domain for restrictions
    """
    if backend.name == 'google-oauth2':
        email = response.get('email', '')
        # Example: Allow only specific email domains
        # allowed_domains = ['example.com', 'school.edu']
        # domain = email.split('@')[1]
        # if domain not in allowed_domains:
        #     return render(kwargs['request'], 'jobs/login.html', {
        #         'error': 'Please use an authorized email domain.'
        #     })

@partial
def set_user_role(backend, user, response, *args, **kwargs):
    """
    Optional: Set user role based on email domain or other criteria
    """
    if backend.name == 'google-oauth2':
        try:
            # Example: Set role based on email domain
            # email = response.get('email', '')
            # if email.endswith('@company.com'):
            #     role = Role.objects.get_or_create(role_name='Employer')[0]
            #     user.role = role
            #     user.save()
            #     messages.success(kwargs['request'], 'Welcome! You have been registered as an employer.')
            pass
        except Exception as e:
            print(f"Error setting role: {str(e)}")

def handle_social_auth_exception(backend, strategy, details, response, *args, **kwargs):
    """
    Handle exceptions during social authentication
    """
    try:
        social = kwargs.get('social')
        if social:
            # Update social auth tokens if needed
            if 'access_token' in response:
                social.extra_data['access_token'] = response['access_token']
            if 'refresh_token' in response:
                social.extra_data['refresh_token'] = response['refresh_token']
            social.save()
    except Exception as e:
        messages.error(kwargs['request'], 'An error occurred during social authentication.')
        return None 