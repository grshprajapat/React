<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class AutomobileAttributeFuel extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
	protected $table = 'automobile_attribute_fuel';
    protected $fillable = [
        'id',
		'name',
       
    ];



}
