from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from jobs.models import Job
from django.db.models import Q

def home(request):
    featured_jobs = Job.objects.all().order_by('-created_at')[:6]
    return render(request, 'jobs/home.html', {'featured_jobs': featured_jobs})

def about(request):
    return render(request, 'jobs/about.html')

def contact(request):
    return render(request, 'jobs/contact.html')

def jobs_list(request):
    jobs = Job.objects.all().order_by('-created_at')
    job_type = request.GET.get('type', 'All')
    search_query = request.GET.get('search', '')

    if job_type != 'All':
        jobs = jobs.filter(job_type=job_type)
    
    if search_query:
        jobs = jobs.filter(
            Q(job_title__icontains=search_query) |
            Q(company__icontains=search_query) |
            Q(location__icontains=search_query)
        )

    return render(request, 'jobs/jobs.html', {
        'jobs': jobs,
        'job_type': job_type,
        'search_query': search_query
    })

def job_detail(request, job_id):
    job = get_object_or_404(Job, id=job_id)
    return render(request, 'jobs/job_detail.html', {'job': job})

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            # Check if user is not an admin
            if user.role.role_name != 'admin':
                login(request, user)
                return redirect('home')
            else:
                messages.error(request, 'Admin users cannot login to this application.')
        else:
            messages.error(request, 'Invalid username or password.')
    
    return render(request, 'jobs/login.html')

@login_required
def logout_view(request):
    logout(request)
    return redirect('home')

@login_required
def profile(request):
    return render(request, 'jobs/profile.html', {'user': request.user})
