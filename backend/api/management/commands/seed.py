from django.core.management.base import BaseCommand
from api.seed import seed_data


class Command(BaseCommand):
    help = 'Seed the database with initial Panas Pharmaceutical data'

    def handle(self, *args, **kwargs):
        seed_data()
        self.stdout.write(self.style.SUCCESS('Database seeded successfully!'))
