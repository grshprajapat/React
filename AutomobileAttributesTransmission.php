<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class AutomobileAttributeTransmission extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
	protected $table = 'automobile_attribute_transmission';
    protected $fillable = [
        'id',
		'name',
       
    ];



}
