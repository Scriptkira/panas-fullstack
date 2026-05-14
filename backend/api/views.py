from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import (
    SiteSettings, Certification, Division, Product,
    NewsItem, JobPosting, ContactSubmission, GalleryImage
)
from .serializers import (
    SiteSettingsSerializer, CertificationSerializer,
    DivisionSerializer, DivisionListSerializer,
    ProductSerializer, NewsItemSerializer,
    JobPostingSerializer, ContactSubmissionSerializer,
    GalleryImageSerializer
)


class SiteSettingsView(APIView):
    def get(self, request):
        settings = SiteSettings.load()
        serializer = SiteSettingsSerializer(settings)
        return Response(serializer.data)


class CertificationListView(generics.ListAPIView):
    queryset = Certification.objects.filter(is_active=True)
    serializer_class = CertificationSerializer


class DivisionListView(generics.ListAPIView):
    queryset = Division.objects.all()
    serializer_class = DivisionListSerializer


class DivisionDetailView(generics.RetrieveAPIView):
    queryset = Division.objects.all()
    serializer_class = DivisionSerializer
    lookup_field = 'slug'


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        qs = Product.objects.all()
        division = self.request.query_params.get('division')
        if division:
            qs = qs.filter(division__slug=division)
        return qs


class NewsListView(generics.ListAPIView):
    queryset = NewsItem.objects.filter(is_active=True)
    serializer_class = NewsItemSerializer


class JobListView(generics.ListAPIView):
    queryset = JobPosting.objects.filter(is_active=True)
    serializer_class = JobPostingSerializer


class ContactSubmitView(APIView):
    def post(self, request):
        serializer = ContactSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'success': True, 'message': 'Thank you! We will get back to you within 24 hours.'},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {'success': False, 'errors': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )


class SiteStatsView(APIView):
    def get(self, request):
        settings = SiteSettings.load()
        import datetime
        years = datetime.date.today().year - settings.established_year
        return Response({
            'years': years,
            'products': Product.objects.count() or 200,
            'divisions': Division.objects.count() or 4,
            'certifications': Certification.objects.filter(is_active=True).count() or 5,
        })


class GalleryListView(generics.ListAPIView):
    queryset = GalleryImage.objects.filter(is_active=True)
    serializer_class = GalleryImageSerializer
