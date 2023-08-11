# Ecolomie
CLE UTILE POUR IMPORT DES PRODUITS :

<!-- ->setBarcode($arrayProduct['code']) => [0]
    ->setName($arrayProduct['product_name']) => [8]
    ->setNutriscore($arrayProduct['nutriscore_grade']) => [55]
    ->setImage($arrayProduct['image_small_url']) ==> [80] -->   


Commande pour no limit RAM :
symfony php -d memory_limit=-1 bin/console app:import-products 