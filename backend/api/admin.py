from django.contrib import admin
from django.utils.html import format_html
from .models import (
    SiteSettings, Certification, Division, Product,
    NewsItem, JobPosting, ContactSubmission, GalleryImage
)


# ---------- Site Settings (Singleton) ----------
@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Company Identity', {
            'fields': ('company_name', 'company_short', 'tagline', 'established_year', 'fiscal_year')
        }),
        ('Hero Section', {
            'fields': ('hero_heading', 'hero_subtext', 'announcement_text'),
            'description': 'Controls the homepage hero banner and scrolling announcement bar.'
        }),
        ('Contact Information', {
            'fields': ('phone_primary', 'phone_secondary', 'email', 'website_url', 'address_line1', 'address_line2', 'google_maps_url'),
        }),
        ('About / Mission / Vision', {
            'fields': ('about_short', 'about_full', 'mission', 'vision', 'values'),
            'classes': ('collapse',),
        }),
        ('Footer', {
            'fields': ('copyright_text',),
        }),
    )

    def has_add_permission(self, request):
        # Only allow one instance
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


# ---------- Certifications ----------
@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ['icon_display', 'short_name', 'name', 'order', 'is_active']
    list_editable = ['order', 'is_active']
    list_display_links = ['short_name']

    def icon_display(self, obj):
        return obj.icon
    icon_display.short_description = ''


# ---------- Divisions ----------
@admin.register(Division)
class DivisionAdmin(admin.ModelAdmin):
    list_display = ['icon_display', 'name', 'slug', 'color_swatch', 'product_count', 'order']
    list_editable = ['order']
    prepopulated_fields = {'slug': ('name',)}

    def icon_display(self, obj):
        return obj.icon
    icon_display.short_description = ''

    def color_swatch(self, obj):
        return format_html('<span style="display:inline-block;width:20px;height:20px;border-radius:4px;background:{}"></span> {}', obj.color, obj.color)
    color_swatch.short_description = 'Color'

    def product_count(self, obj):
        return obj.products.count()
    product_count.short_description = 'Products'


# ---------- Products ----------
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'division', 'form', 'indication_short', 'is_featured']
    list_filter = ['division', 'form', 'is_featured']
    search_fields = ['name', 'indication', 'description']
    list_editable = ['is_featured']
    list_per_page = 30

    def indication_short(self, obj):
        return obj.indication[:60] + '...' if len(obj.indication) > 60 else obj.indication
    indication_short.short_description = 'Indication'


# ---------- News ----------
@admin.register(NewsItem)
class NewsItemAdmin(admin.ModelAdmin):
    list_display = ['title', 'tag', 'date', 'is_active']
    list_filter = ['tag', 'is_active']
    list_editable = ['is_active']
    search_fields = ['title', 'body']


# ---------- Jobs ----------
@admin.register(JobPosting)
class JobPostingAdmin(admin.ModelAdmin):
    list_display = ['title', 'department', 'job_type', 'location', 'is_active', 'posted_date']
    list_filter = ['department', 'job_type', 'is_active']
    list_editable = ['is_active']
    search_fields = ['title', 'description']


# ---------- Contact Submissions ----------
@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'subject', 'submitted_at', 'is_read']
    list_filter = ['is_read', 'subject']
    readonly_fields = ['first_name', 'last_name', 'email', 'phone', 'subject', 'message', 'submitted_at']
    list_editable = ['is_read']
    search_fields = ['first_name', 'last_name', 'email', 'message']

    def full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    full_name.short_description = 'Name'

    def has_add_permission(self, request):
        return False


# ---------- Gallery ----------
@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'image_preview', 'is_featured', 'order', 'is_active']
    list_editable = ['is_featured', 'order', 'is_active']
    list_filter = ['is_featured', 'is_active']

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height:40px;border-radius:4px;" />', obj.image.url)
        return '-'
    image_preview.short_description = 'Preview'


# ---------- Admin Site Config ----------
admin.site.site_header = 'PANAS Pharmaceutical Admin'
admin.site.site_title = 'Panas Admin'
admin.site.index_title = 'Content Management - FY 2081/82'
