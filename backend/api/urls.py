from django.urls import path
from . import views

urlpatterns = [
    path('settings/', views.SiteSettingsView.as_view(), name='site-settings'),
    path('certifications/', views.CertificationListView.as_view(), name='certification-list'),
    path('divisions/', views.DivisionListView.as_view(), name='division-list'),
    path('divisions/<slug:slug>/', views.DivisionDetailView.as_view(), name='division-detail'),
    path('products/', views.ProductListView.as_view(), name='product-list'),
    path('news/', views.NewsListView.as_view(), name='news-list'),
    path('jobs/', views.JobListView.as_view(), name='job-list'),
    path('contact/', views.ContactSubmitView.as_view(), name='contact-submit'),
    path('stats/', views.SiteStatsView.as_view(), name='site-stats'),
    path('gallery/', views.GalleryListView.as_view(), name='gallery-list'),
]
