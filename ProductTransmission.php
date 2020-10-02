<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class ProductTransmission extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
	protected $table = 'product_transmissions';
    protected $fillable = [
		
		'product_id',
		'product_attribute_transmission_id',
		
       
    ];



}
