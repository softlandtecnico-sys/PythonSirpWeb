from django.shortcuts import render

# Create your views here.
def mdi_home(request):
    return render(request, 'index.html')
