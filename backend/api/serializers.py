from rest_framework import serializers
from .models import (
    SiteSettings, Certification, Division, Product,
    NewsItem, JobPosting, ContactSubmission, GalleryImage
)


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        exclude = ['id']


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ['id', 'name', 'short_name', 'icon', 'description']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'form', 'indication', 'description', 'is_featured']


class DivisionSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Division
        fields = ['id', 'name', 'slug', 'icon', 'description', 'color', 'products']


class DivisionListSerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Division
        fields = ['id', 'name', 'slug', 'icon', 'description', 'color', 'product_count']

    def get_product_count(self, obj):
        return obj.products.count()


class NewsItemSerializer(serializers.ModelSerializer):
    tag_display = serializers.CharField(source='get_tag_display', read_only=True)

    class Meta:
        model = NewsItem
        fields = ['id', 'tag', 'tag_display', 'title', 'body', 'date']


class JobPostingSerializer(serializers.ModelSerializer):
    department_display = serializers.CharField(source='get_department_display', read_only=True)
    job_type_display = serializers.CharField(source='get_job_type_display', read_only=True)

    class Meta:
        model = JobPosting
        fields = [
            'id', 'title', 'department', 'department_display',
            'job_type', 'job_type_display', 'location',
            'description', 'requirements', 'posted_date'
        ]


class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = ['id', 'first_name', 'last_name', 'email', 'phone', 'subject', 'message']


class GalleryImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = GalleryImage
        fields = ['id', 'title', 'image_url', 'caption', 'is_featured', 'order']

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
