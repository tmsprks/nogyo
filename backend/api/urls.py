from django.urls import path
from . import views


urlpatterns = [
    path("wallets/", views.WalletListCreate.as_view(), name="wallet-list"),
    path("wallets/delete/<int:pk>/", views.WalletDelete.as_view(), name="delete-wallet"), 
    path('user/', views.UserDetailView.as_view(), name='user-detail')
]