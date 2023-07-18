<?php


$json = file_get_contents("openfoodfacts-products.jsonl");

var_dump(json_decode($json));
