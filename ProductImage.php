<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class ProductImage extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
	protected $table = 'product_images';
    protected $fillable = [
        'id',
		'product_id',
		'product_image',
        
    ];



}
