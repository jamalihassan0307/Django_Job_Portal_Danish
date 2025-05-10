from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Q
from .models import Job, User, ContactDetail

def home(request):
    featured_jobs = Job.objects.all()[:6]
    return render(request, 'jobs/home.html', {'featured_jobs': featured_jobs})

def jobs_list(request):
    jobs = Job.objects.all()
    search_query = request.GET.get('search', '')
    job_type = request.GET.get('type', 'All')
    
    if search_query:
        jobs = jobs.filter(job_title__icontains=search_query)
    if job_type != 'All':
        jobs = jobs.filter(job_type=job_type)
    
    return render(request, 'jobs/jobs.html', {'jobs': jobs})

def job_detail(request, job_id):
    job = get_object_or_404(Job, id=job_id)
    return render(request, 'jobs/job_detail.html', {'job': job})

def about(request):
    return render(request, 'jobs/about.html')

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        ContactDetail.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message
        )
        
        messages.success(request, 'Your message has been sent successfully!')
        return redirect('contact')
    
    return render(request, 'jobs/contact.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            messages.success(request, 'Welcome back!')
            return redirect('home')
        else:
            messages.error(request, 'Invalid username or password.')
    
    return render(request, 'jobs/login.html')

@login_required
def logout_view(request):
    logout(request)
    messages.success(request, 'You have been logged out successfully.')
    return redirect('home')

@login_required
def profile(request):
    return render(request, 'jobs/profile.html')

@login_required
def edit_profile(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        
        user = request.user
        user.username = username
        user.first_name = first_name
        user.last_name = last_name
        user.save()
        
        messages.success(request, 'Profile updated successfully!')
        return redirect('profile')
    
    return render(request, 'jobs/edit_profile.html')

@login_required
def add_job(request):
    if request.method == 'POST':
        job = Job.objects.create(
            job_title=request.POST.get('job_title'),
            company=request.POST.get('company'),
            company_url=request.POST.get('company_url'),
            location=request.POST.get('location'),
            job_type=request.POST.get('job_type'),
            salary=request.POST.get('salary'),
            description=request.POST.get('description'),
            created_by=request.user
        )
        ContactDetail.objects.create(
            job=job,
            email=request.POST.get('contact_email'),
            phone=request.POST.get('contact_phone')
        )
        messages.success(request, 'Job posted successfully!')
        return redirect('job_detail', job_id=job.id)
    return render(request, 'jobs/add_job.html')

@login_required
def edit_job(request, job_id):
    job = get_object_or_404(Job, id=job_id, created_by=request.user)
    if request.method == 'POST':
        job.job_title = request.POST.get('job_title')
        job.company = request.POST.get('company')
        job.company_url = request.POST.get('company_url')
        job.location = request.POST.get('location')
        job.job_type = request.POST.get('job_type')
        job.salary = request.POST.get('salary')
        job.description = request.POST.get('description')
        job.save()
        
        contact = job.contact_details
        contact.email = request.POST.get('contact_email')
        contact.phone = request.POST.get('contact_phone')
        contact.save()
        
        messages.success(request, 'Job updated successfully!')
        return redirect('job_detail', job_id=job.id)
    return render(request, 'jobs/edit_job.html', {'job': job})

@login_required
def delete_job(request, job_id):
    job = get_object_or_404(Job, id=job_id, created_by=request.user)
    if request.method == 'POST':
        job.delete()
        messages.success(request, 'Job deleted successfully!')
        return redirect('jobs')
    return render(request, 'jobs/delete_job.html', {'job': job})
