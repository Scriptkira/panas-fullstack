"""
Auto-seed initial data for Panas Pharmaceutical website.
Runs once on first startup -- skips if data already exists.
"""


def seed_data():
    try:
        from .models import SiteSettings, Certification, Division, Product, NewsItem, JobPosting
    except Exception:
        return

    # --- Site Settings (singleton) ---
    SiteSettings.load()  # creates default if not exists

    # --- Certifications ---
    if not Certification.objects.exists():
        certs = [
            {'name': 'World Health Organization Good Manufacturing Practices', 'short_name': 'WHO-GMP', 'icon': '\U0001F3C5', 'order': 1},
            {'name': 'Quality Management System Certification', 'short_name': 'ISO 9001:2015', 'icon': '\U0001F4CB', 'order': 2},
            {'name': 'Environmental Management System Certification', 'short_name': 'ISO 14001:2015', 'icon': '\U0001F33F', 'order': 3},
            {'name': 'Current Good Manufacturing Practice Compliant', 'short_name': 'CGMP', 'icon': '\U00002705', 'order': 4},
            {'name': 'Nepal Pharmaceutical Standard', 'short_name': 'Nepal Pharma Standard', 'icon': '\U0001F1F3\U0001F1F5', 'order': 5},
        ]
        for c in certs:
            Certification.objects.create(**c)

    # --- Divisions ---
    if not Division.objects.exists():
        divisions = [
            {'name': 'Kalash', 'slug': 'kalash', 'icon': '\U0001F3FA',
             'description': 'Traditional Ayurvedic & herbal formulations blending ancient wisdom with modern science.',
             'color': '#8e44ad', 'order': 1},
            {'name': 'nuZEN', 'slug': 'nuzen', 'icon': '\U0001F9E0',
             'description': 'Premium nutraceuticals, dietary supplements, and wellness products.',
             'color': '#27ae60', 'order': 2},
            {'name': 'Spandan', 'slug': 'spandan', 'icon': '\U00002764\U0000FE0F',
             'description': 'Cardiovascular healthcare products focused on heart health and circulatory wellness.',
             'color': '#e74c3c', 'order': 3},
            {'name': 'General', 'slug': 'general', 'icon': '\U0001F48A',
             'description': 'Essential allopathic pharmaceutical products across multiple therapeutic categories.',
             'color': '#035faa', 'order': 4},
        ]
        for d in divisions:
            Division.objects.create(**d)

    # --- Products ---
    if not Product.objects.exists():
        kalash = Division.objects.get(slug='kalash')
        nuzen = Division.objects.get(slug='nuzen')
        spandan = Division.objects.get(slug='spandan')
        general = Division.objects.get(slug='general')

        products = [
            (kalash, 'Kalash Amlapittantak Churna', 'powder', 'Hyperacidity, Gastric issues'),
            (kalash, 'Kalash Triphala Churna', 'powder', 'Digestive health, Detox'),
            (kalash, 'Kalash Ashwagandha Capsule', 'capsule', 'Stress, Vitality, Immunity'),
            (kalash, 'Kalash Shilajit Capsule', 'capsule', 'Energy, Strength, Anti-aging'),
            (kalash, 'Kalash Hingwashtak Churna', 'powder', 'Bloating, Indigestion'),
            (kalash, 'Kalash Chyawanprash', 'other', 'General immunity booster'),
            (kalash, 'Kalash Liver Tonic Syrup', 'syrup', 'Liver support, Hepatoprotective'),
            (kalash, 'Kalash Giloy Tablet', 'tablet', 'Immunity, Fever, Anti-inflammatory'),
            (nuzen, 'nuZEN Multivitamin & Mineral', 'tablet', 'Daily nutritional support'),
            (nuzen, 'nuZEN Omega-3 Softgel', 'softgel', 'Heart & brain health'),
            (nuzen, 'nuZEN Vitamin D3 + K2', 'capsule', 'Bone health, Immunity'),
            (nuzen, 'nuZEN Calcium + Magnesium', 'tablet', 'Bone & muscle support'),
            (nuzen, 'nuZEN Zinc + Vitamin C', 'other', 'Immunity & antioxidant'),
            (nuzen, 'nuZEN Probiotics', 'capsule', 'Gut health, Digestion'),
            (nuzen, 'nuZEN Protein Supplement', 'powder', 'Muscle growth, Recovery'),
            (nuzen, 'nuZEN CoQ10', 'softgel', 'Cellular energy, Heart health'),
            (spandan, 'Spandan Cardiocare Tablet', 'tablet', 'Cardiac support'),
            (spandan, 'Spandan BP Control Capsule', 'capsule', 'Blood pressure management'),
            (spandan, 'Spandan Cholesterol Balance', 'tablet', 'Lipid profile management'),
            (spandan, 'Spandan CoQ10 + L-Carnitine', 'softgel', 'Heart muscle energy'),
            (spandan, 'Spandan Hawthorn Extract', 'capsule', 'Cardiovascular tonic'),
            (spandan, 'Spandan Arjuna Syrup', 'syrup', 'Traditional heart tonic'),
            (general, 'Paracetamol 500mg', 'tablet', 'Analgesic / Antipyretic'),
            (general, 'Amoxicillin 500mg', 'capsule', 'Antibiotic'),
            (general, 'Metformin 500mg', 'tablet', 'Antidiabetic'),
            (general, 'Omeprazole 20mg', 'capsule', 'Proton Pump Inhibitor'),
            (general, 'Cetirizine 10mg', 'tablet', 'Antihistamine'),
            (general, 'Ibuprofen 400mg', 'tablet', 'NSAID / Anti-inflammatory'),
            (general, 'ORS Powder', 'powder', 'Electrolyte Replacement'),
            (general, 'Antacid Suspension', 'syrup', 'Gastrointestinal'),
        ]
        for div, name, form, indication in products:
            Product.objects.create(division=div, name=name, form=form, indication=indication)

    # --- News ---
    if not NewsItem.objects.exists():
        NewsItem.objects.create(tag='new_product', title='Spandan Division Expands Its Product Line',
            body='New Spandan cardiovascular products have been launched for FY 2081/82.')
        NewsItem.objects.create(tag='certification', title='ISO 14001:2015 Certification Successfully Renewed',
            body='Panas Pharmaceuticals continues its commitment to environmental responsibility.')
        NewsItem.objects.create(tag='careers', title='We Are Hiring -- Join the Panas Family',
            body='Panas Pharmaceutical is looking for talented, motivated individuals for FY 2081/82.')

    # --- Jobs ---
    if not JobPosting.objects.exists():
        JobPosting.objects.create(title='Medical Sales Representative', department='sales',
            location='Nepalgunj / Field',
            description='Promote Panas pharmaceutical products to doctors, clinics, and hospitals.',
            requirements='B.Sc. in Life Sciences or B.Pharm preferred.')
        JobPosting.objects.create(title='Quality Control Analyst', department='qc',
            location='Banke, Nepal',
            description='Conduct quality testing of raw materials and finished products.',
            requirements='B.Pharm or M.Sc. Chemistry required.')
        JobPosting.objects.create(title='Production Pharmacist', department='production',
            location='Banke, Nepal',
            description='Oversee pharmaceutical production operations, ensure GMP compliance.',
            requirements='B.Pharm / M.Pharm with Nepal Pharmacy Council registration.')
        JobPosting.objects.create(title='Accounts & Finance Officer', department='finance',
            location='Nepalgunj, Banke',
            description='Manage day-to-day accounting, financial reporting, and payroll.',
            requirements='BBA/BBS in Accounting & Finance.')
