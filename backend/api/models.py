from django.db import models


class SiteSettings(models.Model):
    """Singleton model for dynamic site-wide settings. Only one row should exist."""
    company_name = models.CharField(max_length=200, default='PANAS Pharmaceutical')
    company_short = models.CharField(max_length=100, default='PANAS Pharma')
    tagline = models.CharField(max_length=300, default='Lighting the lamp for living a healthy life')
    established_year = models.PositiveIntegerField(default=1995)
    hero_heading = models.CharField(max_length=300, default='Lighting the Lamp for Living a Healthy Life')
    hero_subtext = models.TextField(default='Panas Pharmaceutical P. Ltd. has been delivering safety and peace of mind through health care products manufactured under the highest international standards since 1995.')
    announcement_text = models.TextField(default='Welcome to Panas Pharmaceuticals', help_text='Scrolling ticker text on top of the site')
    # Contact Info
    phone_primary = models.CharField(max_length=30, default='(977) 81-403004')
    phone_secondary = models.CharField(max_length=30, default='081-523668', blank=True)
    email = models.EmailField(default='info@panaspharma.com')
    website_url = models.URLField(default='https://www.panaspharma.com', blank=True)
    address_line1 = models.CharField(max_length=200, default='Janaki-6, Ganapur')
    address_line2 = models.CharField(max_length=200, default='Banke, Nepal')
    google_maps_url = models.URLField(default='https://maps.google.com/?q=Banke,Nepal', blank=True)
    # About
    about_short = models.TextField(default='From a humble beginning in Banke, Nepal, Panas Pharmaceuticals has grown into one of Nepal\'s most trusted names in healthcare manufacturing.')
    about_full = models.TextField(default='Panas Pharmaceutical P. Ltd. was established with a clear and noble purpose — to make quality, affordable medicines accessible to every Nepali.')
    mission = models.TextField(default='To manufacture and deliver high-quality, safe, and effective pharmaceutical products that improve the health and quality of life of the people of Nepal, at an affordable cost.')
    vision = models.TextField(default='"To live healthy and enjoy life to the fullest every day." We envision a Nepal where every citizen has access to world-class healthcare products.')
    values = models.TextField(default='Quality, Integrity, Innovation, and Community. We believe that business success and social responsibility go hand in hand.')
    # Fiscal year
    fiscal_year = models.CharField(max_length=20, default='2081/82')
    copyright_text = models.CharField(max_length=300, default='Copyright 2006-2026 Panas Pharmaceuticals P. Ltd. All Rights Reserved.')

    class Meta:
        verbose_name = 'Site Settings'
        verbose_name_plural = 'Site Settings'

    def __str__(self):
        return 'Site Settings'

    def save(self, *args, **kwargs):
        """Ensure only one instance exists (singleton pattern)."""
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class Certification(models.Model):
    name = models.CharField(max_length=100)
    short_name = models.CharField(max_length=50, help_text='e.g. WHO-GMP, ISO 9001:2015')
    icon = models.CharField(max_length=10, default='🏅')
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.short_name


class Division(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=10, default='💊')
    description = models.TextField()
    color = models.CharField(max_length=20, default='#035faa')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


class Product(models.Model):
    FORM_CHOICES = [
        ('tablet', 'Tablet'),
        ('capsule', 'Capsule'),
        ('syrup', 'Syrup'),
        ('powder', 'Powder'),
        ('softgel', 'Softgel'),
        ('injection', 'Injection'),
        ('cream', 'Cream'),
        ('drops', 'Drops'),
        ('other', 'Other'),
    ]

    division = models.ForeignKey(Division, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=200)
    form = models.CharField(max_length=50, choices=FORM_CHOICES)
    indication = models.CharField(max_length=300)
    description = models.TextField(blank=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['division', 'name']

    def __str__(self):
        return f"{self.name} ({self.division.name})"


class NewsItem(models.Model):
    TAG_CHOICES = [
        ('new_product', 'New Product'),
        ('certification', 'Certification'),
        ('careers', 'Careers'),
        ('event', 'Event'),
        ('announcement', 'Announcement'),
    ]

    tag = models.CharField(max_length=50, choices=TAG_CHOICES)
    title = models.CharField(max_length=300)
    body = models.TextField()
    date = models.DateField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return self.title


class JobPosting(models.Model):
    DEPT_CHOICES = [
        ('sales', 'Sales & Marketing'),
        ('qc', 'Quality Control'),
        ('production', 'Manufacturing'),
        ('finance', 'Finance'),
        ('hr', 'Human Resources'),
        ('it', 'IT'),
        ('rd', 'R&D'),
        ('admin', 'Administration'),
    ]
    TYPE_CHOICES = [
        ('full_time', 'Full-Time'),
        ('part_time', 'Part-Time'),
        ('contract', 'Contract'),
    ]

    title = models.CharField(max_length=200)
    department = models.CharField(max_length=50, choices=DEPT_CHOICES)
    job_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='full_time')
    location = models.CharField(max_length=100, default='Banke, Nepal')
    description = models.TextField()
    requirements = models.TextField()
    is_active = models.BooleanField(default=True)
    posted_date = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['-posted_date']

    def __str__(self):
        return self.title


class ContactSubmission(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.first_name} {self.last_name} -- {self.subject}"


class GalleryImage(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='gallery/')
    caption = models.CharField(max_length=300, blank=True)
    is_featured = models.BooleanField(default=False, help_text='Featured images appear larger in the gallery grid')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title
