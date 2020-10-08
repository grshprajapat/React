<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Product;
use App\Brand;
use App\Category;
use App\ProductAttributeMotor;
use App\ProductMotor;
use App\ProductElectronic;
use App\ProductFuel;
use App\ProductTransmission;
use App\PropertyAttributeType;
use App\PropertyType;
use App\ProductImage;
use App\Seo;
use App\ProductAttributeTransmission;
use App\PropertyAttributeService;
use App\PropertyService;
use App\PropertyCelling;
use App\PropertyAttributeCelling;
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
		
	    $categories                  = Category::where('parent_id','0')->orderBy('id', 'DESC')->get();	
		$brands                      = Brand::orderBy('id', 'DESC')->get();
		$prdattrelectronic           = ProductAttributeElectronic::orderBy('id', 'DESC')->get();
		$pdctelectronic              = ProductElectronic::orderBy('id', 'DESC')->get();
		$prdattrtransmission         = ProductAttributeTransmission::orderBy('id', 'DESC')->get();
		$prdattrfuel                 = ProductAttributeFuel::orderBy('id', 'DESC')->get();
		$pdctfuel                    = ProductFuel::orderBy('id', 'DESC')->get();
		$pdcttransmission            = ProductTransmission::orderBy('id', 'DESC')->get();
		$pdctattrmotor               = ProductAttributeMotor::orderBy('id', 'DESC')->get();
		$pdctmotor                   = ProductMotor::orderBy('id', 'DESC')->get();
		$propertyatt                 = PropertyAttributeType::orderBy('id', 'DESC')->get();
		$propertytyp                 = PropertyType::orderBy('id', 'DESC')->get();
		$propertyaatflattyp          = PropertyAttributeService::orderBy('id', 'DESC')->get();
		$propertyflattyp             = PropertyService::orderBy('id', 'DESC')->get();
		
		$propertyattcell             = PropertyAttributeCelling::orderBy('id', 'DESC')->get();
		$propertycellg            = PropertyCelling::orderBy('id', 'DESC')->get();
		
		
		$dataarray=array();
		
		$dataarray['categories']=$categories;
		$dataarray['brands']=$brands;
		$dataarray['prdattrtransmission']=$prdattrtransmission;
		$dataarray['prdattrfuel']=$prdattrfuel;
		$dataarray['pdctelectronic']=$pdctelectronic;
		$dataarray['prdattrelectronic']=$prdattrelectronic;
		$dataarray['pdctfuel']=$pdctfuel;
		$dataarray['pdcttransmission']=$pdcttransmission;
		$dataarray['pdctattrmotor']=$pdctattrmotor;
		$dataarray['pdctmotor']=$pdctmotor;
		$dataarray['propertyatt']=$propertyatt;
		$dataarray['propertytyp']=$propertytyp;
		$dataarray['propertyaatflattyp']=$propertyaatflattyp;
		$dataarray['propertyflattyp']=$propertyflattyp;
		
		$dataarray['propertyattcell']=$propertyattcell;
		$dataarray['propertycellg']=$propertycellg;
		
		
		
		
        return response()->json([
                'status' => 201,
                'data' => $dataarray,
            ], 201);
		
	}
							
	
	
	
	
	
	
	
	public function store(Request $request)
	{			
		// $fuel = ProductAttributeFuel::where('id', $request->id)->belongsTo();
		// echo '<pre>';
		// print_r($request->all()); die;
		
		
	
	
		
		$entry = new Product;
		$entry->title = $request->title;
		$entry->sub_title = $request->sub_title;
		$entry->product_category = $request->product_category;
		$entry->description = $request->description;
		$entry->vin = $request->vin;
		
		$entry->product_condition = $request->product_condition;
		$entry->product_brand = $request->product_brand;
		$entry->product_year = $request->product_year;	
		$entry->engine= $request->engine;
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
        $entry->property_name =$request->property_name;
        $entry->property_condition =$request->property_condition;
        $entry->owner_img =$request->owner_img;
        $entry->bedroom_flat =$request->bedroomFlat;
        $entry->bedroom_house =$request->bedroomHouse;
        $entry->property_bb =$request->property_bb;
        $entry->holiday_home =$request->holiday_home;
        $entry->property_location =$request->addressOne.', '.$request->addressTwo.', '.$request->postalCode.','.$request->city.','.$request->state;
		/* saving checkboxes */
		
		
		
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
		
		
		
		/* storing electronic  */
		if($request->product_electronic_id != null) {
			foreach($request->product_electronic_id as $val)
			{
				$productElec = new ProductElectronic;
				$productElec->product_id = $entry->id;
				$productElec->product_attribute_electronic_id = $val;
				$productElec->save();
			}
			
		}
		
		if($request->product_motor_id != null) 
		{
			foreach($request->product_motor_id as $val)
				{
					$productMot = new ProductMotor;
					$productMot->product_id = $entry->id;
					$productMot->product_attribute_motor_id = $val;
					$productMot->save();
				}
		}
					

					// /* stoing prouct fuel */
						
					$productfue = new ProductFuel;
					$productfue->product_id = $entry->id;
					$productfue->product_attribute_fuel_id = $request->product_fuel_id;
					
					$productfue->save();
					// /* stoing Celling */
						
					$productcel = new PropertyCelling;
					$productcel->product_id = $entry->id;
					$productcel->property_attribute_celling_id = $request->property_celling_id;
					
					$productcel->save();
					
					/* storing transmission */
					$productTran = new ProductTransmission;
					$productTran->product_id = $entry->id;
					$productTran->product_attribute_transmission_id = $request->product_transmission_id;
					$productTran->save();
					
				/* storing Property Attribute */
					$propertyty = new PropertyType;
					$propertyty->product_id = $entry->id;
					$propertyty->property_attribute_type_id = $request->property_type_id;
					$propertyty->save();
				
		
		/* storing Property Service Type  */
			if($request->property_service_id != null) {
			foreach($request->property_service_id as $val)
			{
				$propertyFlttyp= new PropertyService;
				$propertyFlttyp->product_id = $entry->id;
				$propertyFlttyp->property_attribute_service_id = $val;
				$propertyFlttyp->save();
			}
			
		}
	
		
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
		 /* storing owner image */
		 
		 if ($request->get('img')) {
			 
			 $img = $request->get('img');
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

			if( strpos( $img, $needle ) !== false)
			{
				$image_parts = explode(";base64,", $img);

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
				$image_parts = explode(";base64,", $img);

				$image_type_aux = explode("image/", $image_parts[0]);

				$image_type = $image_type_aux[1];

				$image_base64 = base64_decode($image_parts[1]);
				
				$uniquesavename=time().uniqid(rand());
				
				$imageName = $uniquesavename.'.png';
				$file = $dir . $imageName;
				file_put_contents($file, $image_base64);
					
			}
				
				$entry->owner_img = date("Y") . "/" . date("m") . "/" .$imageName;
				$entry->save();
			}
         
           
		 
		 
		 
		/* if($dataArray)
		{
			foreach($dataArray as $val)
			{
				$prdattrelectronic = ProductAttributeElectronic::where('name', $val->name)->first();
				
				if(!$pdctattrmotor)
				{
					$pdctattrmotor = new ProductAttributeMotor;
					$pdctattrmotor->name = $val->name;
					$pdctattrmotor->save();
				}
			} 
			$product_attribute_motor_ids = [];
			foreach($dataArray as $val)
			{
				$pdctattrmotorId = ProductAttributeMotor::select('id')->where('name', $val->name)->get();
				
				foreach($pdctattrmotorId as $key)
				{
					 $product_attribute_motor_ids = $key->id;
				}	
				
			}
		
		
		$pdctmotor = new ProductMotor;
		$pdctmotor->product_id = $entry->id;
		$pdctmotor->product_attribute_motor_id	 = $pdctattrmotor->id;
		
		$pdctmotor->save();
		$pdctmotor=DB::table('product_motors')->insert($product_attribute_motor_ids );
		
		
		
		
		 } */
		 
					
						
		
								
					
					
		return response()->json([
                'status' => 201,
                'message' => 'Resource added WONDEFULL.'
            ], 201);
    }
	

       
	
		public function edit(Request $request)
			{
		
		
		
		  $product = Product::where('id', $request->id)->firstOrFail();
		
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
				   'engine' => $request->engine,
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
                'property_name' => $request->property_name,
                'property_condition' => $request->property_condition,
                'bedroom_flat' => $request->bedroomFlat,
                'bedroom_house' => $request->bedroomHouse,
                'owner_img' => $request->owner_img,
                'property_bb' => $request->property_bb,
                'holiday_home' => $request->holiday_home,
                
               
                'property_location' => $request->addressOne.', '.$request->addressTwo.', '.$request->postalCode.','.$request->city.','.$request->state,
				
				
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
		
				// /* storing fuel  */
				
				
					// $prdattrfuels = ProductAttributeFuel::where('id', $request->product_attribute_fuel_id)->firstOrFail();
					// if($prdattrfuels)
		// {
			// $updateDetails = [
				// 'name' => $request->name,
			
			// ];
        
			// \DB::table('product_attributes_fuels')
				// ->where('id', $request->id)
				// ->update($updateDetails);
		// }
				   // /*storing transmission  */
				// $prdattrtransmissions = ProductAttributeTransmission::where('id', $request->product_attribute_fuel_id)->firstOrFail();
					// if($prdattrtransmissions)
		// {
			// $updateDetails = [
				// 'name' => $request->name,
			
			// ];

			// \DB::table('product_attributes_transmissions')
				// ->where('id', $request->id)
				// ->update($updateDetails);
		// }
						   // /*updating product electronic   */
				// $pdctelectronic = ProductElectronic::where('id', $request->product_electronic_id)->firstOrFail();
					// if($pdctelectronic)
		// {
			// $updateDetails = [
				// 'name' => $request->name,
			
			// ];

			// \DB::table('product_electronics')
				// ->where('id', $request->id)
				// ->update($updateDetails);
		// }
		
		$pdctmotor = ProductMotor::where('product_id', $request->id)->exists();
			if($pdctmotor)
			{
				$updateDetails = [
					'product_attribute_motor_id' => $ids,
				];

				\DB::table('product_motors')
					->where('product_id', $request->id)
					->update($updateDetails);
			}
			else
			{
				$entryB = new ProductMotor;
				$entryB->blog_id = $request->id;
				$entryB->tag_id = $ids;
				$entryB->save();
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
