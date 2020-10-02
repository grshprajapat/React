<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class ProductElectronic extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
	protected $table = 'product_electronics';
    protected $fillable = [
		
		'product_id',
		'product_attribute_electronic_id',
		
       
    ];



}
