<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class ProductFuel extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
	protected $table = 'product_fuels';
    protected $fillable = [
		
		'product_id',
		'product_attribute_fuel_id',
		
       
    ];



}
