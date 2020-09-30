<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Product extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
	protected $table = 'products';
    protected $fillable = [
        // 'name',
        'title',
        'sub_title',
        'product_category',
       'description',
        	  'vin',
        'product_condition',
        'product_brand',
        'product_year',
        'fuel_type',
        'cd_player',
        'anti_lock_brakes',
        'air_conditioning',
        'power_seat',
        'power_locks',
        'cruise_control',
        'suv',
        'air_bags',
        'sunroof',
        'engine',
        'transmission',
        'warrenty',
        'product_make',
        'product_model',
        'product_color',
		'storage_capacity',
        'camera_resolution',
        'sim_card_slot',
        'ram_memory_card',
        'interior',
        'exterior',
        'video_file_link',
        'youtube',
        'sale_by',
        'selling_duration',
        'selling_price',
        'selling_quantity',
        // 'paypal',
        // 'additional_payment',
        // 'payment_instruction',
        'domestic_return',
        'international_return',
        // 'shhipping_rate',
        // 'free_shipping',
        // 'item_location',
        
		
    ];



  
}
