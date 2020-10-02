<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class ProductAttributeFuel extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
	protected $table = 'product_attribute_fuels';
    protected $fillable = [ 
		'name',
       
    ];



}
