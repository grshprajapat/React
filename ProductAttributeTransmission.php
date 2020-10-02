<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class ProductAttributeTransmission extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
	protected $table = 'product_attribute_transmissions';
    protected $fillable = [
       
		'name',
       
    ];



}
