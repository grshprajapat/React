<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Product;
use App\Brand;
use App\Category;
use App\ProductElectronic;
use App\ProductImage;
use App\Seo;
use App\ProductAttributeTransmission;
use App\ProductAttributeFuel;
use App\ProductAttributeElectronic;


class ProductsController extends Controller
{
    public function index()
    {
		// $products = Product::all();
		$products = Product::orderBy('id', 'DESC')->get();
        return response()->json([
                'status' => 201,
                'data' => $products
            ], 201);
		// return $products;	
    }
	
	
	public function prdformdatalist()
	{
		
	    $categories            = Category::where('parent_id','0')->orderBy('id', 'DESC')->get();
		
		
		$brands                  = Brand::orderBy('id', 'DESC')->get();
		$prdattrtransmissions    = ProductAttributeTransmission::orderBy('id', 'DESC')->get();
		$prdattrfuels            = ProductAttributeFuel::orderBy('id', 'DESC')->get();
		$prdattrelectronic        = ProductAttributeElectronic::orderBy('id', 'DESC')->get();
		$pdctelectronic          = ProductElectronic::orderBy('id', 'DESC')->get();
		
		$dataarray=array();
		
		$dataarray['categories']=$categories;
		$dataarray['brands']=$brands;
		$dataarray['prdattrtransmissions']=$prdattrtransmissions;
		$dataarray['prdattrfuels']=$prdattrfuels;
		$dataarray['pdctelectronic']=$pdctelectronic;
		$dataarray['prdattrelectronic']=$prdattrelectronic;
		
		
		
        return response()->json([
                'status' => 201,
                'data' => $dataarray,
            ], 201);
		
	}
							
	
	
	
	
	
	
	
	public function store(Request $request)
	{			
		// $fuel = ProductAttributeFuel::where('id', $request->id)->belongsTo();
		$array = array("cd_player", "anti_lock_brakes", "air_conditioning", "power_seat", "power_locks", "cruise_control", "suv", "air_bags", "sunroof", "domestic_return", "international_return");

		$entry = new Product;
		$entry->title = $request->title;
		$entry->sub_title = $request->sub_title;
		$entry->product_category = $request->product_category;
		$entry->description = $request->description;
		$entry->vin = $request->vin;
		// $entry->product_image = $request->product_image;
		$entry->product_condition = $request->product_condition;
		$entry->product_brand = $request->product_brand;
		$entry->product_year = $request->product_year;
		// $entry->fuel_type = $request->fuel_type;
		// $entry->product_attribute_transmission_id = $trans->product_attribute_transmission_id;
		$entry->cd_player = $request->cd_player;
		$entry->anti_lock_brakes = $request->anti_lock_brakes;
		$entry->air_conditioning = $request->air_conditioning;
		$entry->power_seat = $request->power_seat;
		$entry->power_locks = $request->power_locks;
		$entry->cruise_control = $request->cruise_control;
		$entry->suv = $request->suv;
		$entry->air_bags = $request->air_bags;
		$entry->sunroof= $request->sunroof;
		$entry->engine= $request->engine;
		// $entry->transmission = $request->transmission;
		$entry->warrenty = $request->warrenty;
		$entry->product_make = $request->product_make;
		$entry->product_model = $request->product_model;
		$entry->product_color = $request->product_color;
		$entry->storage_capacity = $request->storage_capacity;
        $entry->camera_resolution = $request->camera_resolution;
        $entry->sim_card_slot = $request->sim_card_slot;
        $entry->ram_memory_card = $request->ram_memory_card;
        $entry->interior= $request->interior;
	   $entry->video_file_link = $request->video_file_link;
       $entry-> youtube =$request->youtube;
       $entry->sale_by =$request->sale_by;
         $entry->selling_duration = $request->selling_duration;
         $entry->selling_quantity = $request->selling_quantity;
         $entry->selling_price = $request->selling_price;
        $entry->domestic_return = $request->domestic_return;
        $entry->international_return =$request->international_return;
		/* saving checkboxes */
		foreach ($array as $value => $key)
		{			
			if($request->$key == true)
			{
				$entry->$key = '1';
			}
			else {
				$entry->$key = '0';
			}
		 }	
		
		$entry->save();
		$seo = new Seo;
		
		$seo->product_id = $entry->id;
		$seo->title = $request->seo_title;
		$seo->description = $request->meta_desc;
		$seo->twitter_title = $request->twitter_title;
		$seo->twitter_image = $request->twitter_image;
		$seo->twitter_description = $request->twitter_desc;
		$seo->open_graph_title = $request->open_graph_title;
		$seo->open_graph_description = $request->open_graph_desc;
		$seo->open_graph_image = $request->open_graph_image;
		$seo->save();
		
		
		/* storinng fuel attribute */
		$prdattrfuels = new ProductAttributesFuel;
		$prdattrfuels->id = $entry->product_attribute_fuel_id;
		$prdattrfuels->name = $request->name;
		$prdattrfuels->save();
		
		/* storing transmission attribute  */
		$prdattrtransmissions = new ProductAttributesTransmission;
		$prdattrtransmissions->id = $entry->product_attribute_transmission_id;
		$prdattrtransmissions->name = $request->name;
		
		$prdattrtransmissions->save();
		
		/* storing checkbox of product electronic attribute  */
		$pdctelectronic = new ProductElectronic;
		$pdctelectronic->id = $entry->product_electronic_id;
		$pdctelectronic->name = $request->name;
		
		$pdctelectronic->save();
		
		
		
		
		/**save product images if having*/
		if ($request->get('file')) {
			 
		 $needle = 'gif';
		 $app = realpath(__DIR__ . '/../../../..');	
		
		 $folderPath = $app."/uploads/";
		 
		 if (!file_exists($folderPath.date("Y"))) {
			mkdir($folderPath.date("Y"), 0777, true);
		 }
			$dir= $folderPath.date("Y")."/".date("m")."/";
			if(!is_dir($dir)){
					mkdir($dir);
			}	
			foreach ($request->get('file') as $file) {
				
			if( strpos( $file, $needle ) !== false)
				{
					$image_parts = explode(";base64,", $file);

					$image_type_aux = explode("image/", $image_parts[0]);

					$image_type = $image_type_aux[1];

					$image_base64 = base64_decode($image_parts[1]);
					
					$uniquesavename=time().uniqid(rand());
					
					$imageName = $uniquesavename.'.gif';
					
					$file = $dir . $imageName;
					file_put_contents($file, $image_base64);
					
				}
				else
				{	
					$image_parts = explode(";base64,", $file);

					$image_type_aux = explode("image/", $image_parts[0]);

					$image_type = $image_type_aux[1];

					$image_base64 = base64_decode($image_parts[1]);
					
					$uniquesavename=time().uniqid(rand());
					
					$imageName = $uniquesavename.'.png';
					$file = $dir . $imageName;
					file_put_contents($file, $image_base64);
					
				}
				
				$imageEntry = new ProductImage;
				$imageEntry->product_id = $entry->id;
				$imageEntry->product_image = date("Y") . "/" . date("m") . "/" .$imageName;
				$imageEntry->save();
			
         
             }
        
		 }
					
						
		
								
					
					
		return response()->json([
                'status' => 201,
                'message' => 'Resource added WONDEFULL.'
            ], 201);
    }
	

       
	
	public function edit(Request $request)
    {
		
		
		
		  $product = Product::where('id', $request->id)->firstOrFail();
		
		// $categories = Category::where('parent_id','0')->orderBy('id', 'DESC')->get();
		
		
		// $category = Category::where('id', $request->id)->firstOrFail();
		
		
		// $subcat = Category::where('parent_id', $category->id)->get();
		
		return response()->json([
                'status' => 201,
                'data' => $product
				// 'categories'=>$categories
            ], 201);
    }
	
	public function update(Request $request)
    {
		$product = Product::where('id', $request->id)->firstOrFail();
		
		 if($request === 'true' || $request === 'TRUE')
            return true;

        if($request === 'false' || $request === 'FALSE')
            return false;

        return $request;
		

		if($product)
		{
			
			
			$updateDetails = [
				// 'name' => $request->name,
					'title' => $request->title,
				  'sub_title' => $request->sub_title,
				  'product_category' => $request->product_category,
				  'description' => $request->description,
				  'vin' => $request->vin,
				  'product_image' => $request->product_image,
					 'product_condition' => $request->product_condition,
					'product_brand' => $request->product_brand,
					'product_year' => $request->product_year,
					// 'fuel_type' => $request->fuel_type,
					'cd_player' => $request->cd_player,
					'anti_lock_brakes' => $request->anti_lock_brakes,
					'air_conditioning' => $request->air_conditioning,
					'power_seat' => $request->power_seat,
					'power_locks' => $request->power_locks,
					'cruise_control' => $request->cruise_control,
					'suv' => $request->suv,
					'air_bags' => $request->air_bags,
					'sunroof' => $request->sunroof,
				   'engine' => $request->engine,
					// 'transmission' => $request->transmission,
				   'warrenty' => $request->warrenty,
				  'product_make' => $request->product_make,
				  'product_model' => $request->product_model,
				  'product_color' => $request->product_color,
				  'storage_capacity' => $request->storage_capacity,
                 'camera_resolution' => $request->camera_resolution,
                 'sim_card_slot' => $request->sim_card_slot,
                 'ram_memory_card' => $request->ram_memory_card,
                 'interior' => $request->interior,
                 'video_file_link' => $request->video_file_link,
                 'youtube' => $request->youtube,
                 'sale_by' => $request->sale_by,
                 'selling_duration' => $request->selling_duration,
                 'selling_quantity' => $request->selling_quantity,
                 'selling_price' => $request->selling_price,
                 'domestic_return' => $request->domestic_return,
                'international_return' => $request->international_return,
                 // 'video_file_link' => $request->video_file_link,
			];

			\DB::table('products')
				->where('id', $request->id)
				->update($updateDetails);
				
				$seo = Seo::where('product_id', $request->id)->firstOrFail();
		
		if($seo)
		{
			$updateDetails = [
				'title' => $request->seo_title,
				'description' => $request->meta_desc,
				'twitter_title' => $request->twitter_title,
				'twitter_image' => $request->twitter_image,
				'twitter_description' => $request->twitter_desc,
				'open_graph_title' => $request->open_graph_title,
				'open_graph_description' => $request->open_graph_desc,
				'open_graph_image' => $request->open_graph_image,
			];
	
			\DB::table('seo')
				->where('product_id', $request->id)
				->update($updateDetails);
		}
		
				/* storing fuel  */
				
				
					$prdattrfuels = ProductAttributesFuel::where('id', $request->product_attribute_fuel_id)->firstOrFail();
					if($prdattrfuels)
		{
			$updateDetails = [
				'name' => $request->name,
			
			];
        
			\DB::table('product_attributes_fuels')
				->where('id', $request->id)
				->update($updateDetails);
		}
				   /*storing transmission  */
				$prdattrtransmissions = ProductAttributesTransmission::where('id', $request->product_attribute_fuel_id)->firstOrFail();
					if($prdattrtransmissions)
		{
			$updateDetails = [
				'name' => $request->name,
			
			];

			\DB::table('product_attributes_transmissions')
				->where('id', $request->id)
				->update($updateDetails);
		}
						   /*updating product electronic   */
				$pdctelectronic = ProductElectronic::where('id', $request->product_electronic_id)->firstOrFail();
					if($pdctelectronic)
		{
			$updateDetails = [
				'name' => $request->name,
			
			];

			\DB::table('product_electronics')
				->where('id', $request->id)
				->update($updateDetails);
		}
		
			return response()->json([
                'status' => 201,
                'message' => 'Resource Updated'
            ], 201);
		}
		else
		{
			echo 'adadasd';
		}
		
		
    }
	
	
	
	public function productsubcategory(Request $request)
    {
			// dd($request);
		
		$category = Category::where('id', $request->id)->firstOrFail();
		
		
		$subcat = Category::where('parent_id', $category->id)->get();
		
		
		
		
		return response()->json([
                'status' => 201,
                'data' => $subcat,
                
            ], 201);
    }
	
	
	public function destroy(Request $request)
    {
        $product = Product::where('id', $request->id)->firstOrFail();
		
        try {
            $product->delete();
            // return $this->responseResourceDeleted();
			return response()->json([
                'status' => 204,
                'message' => 'Resource deleted.'
            ], 204);
        } catch (Exception $e) {
            return $this->responseServerError('Error deleting resource.');
        }
    }

	
}
