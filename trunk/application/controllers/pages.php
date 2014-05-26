<?php

class Pages extends CI_Controller {
        private $filterArray, $reservedArray = [];
    
        public function __construct()
            {
		parent::__construct();
                $this->load->model('sports_model');
                $this->load->helper('url');
                $filterArray = [];
            }
            
        public function view($page = 'home'){                      
            if ( ! file_exists('application/views/pages/'.$page.'.php'))
            {
                // Whoops, we don't have a page for that!
                show_404();
            }
               
            $data['title'] = ucfirst($page); // Capitalize the first letter 
            
            $this->load->view('templates/header', $data);
            $this->load->view('pages/'.$page, $data);
            $this->load->view('templates/footer', $data);
        }    
            
	public function lookup(){   
            $type = $this->input->post('type');
            $data['currentLat'] = $this->input->post('currentLat');
            $data['currentLng'] = $this->input->post('currentLng');
            $data['sortByDist'] = $this->input->post('sortByDist');
            if($type != NULL){
                $data['sports'] = $this->sports_model->get_sports($type);
            }
            else{
                $data['sports'] = $this->sports_model->get_sports();
            }
            
            $this->load->view('templates/results', $data);
	}
        
        public function add_filter($filter){
            //Get input
            $filterType = $this->input->post('');
            $filterValue = $this->input->post('');
            //check what filter it is being applied
            if($filterType === "sport"){
                //check if filter is already been applied
                for($i=0; $i<sizeof($this->filterArray); $i++){
                    if($this->filterArray[$i].key == "sport"){
                        //if applied, check what position the filter is applied
                        if($i==0){
                            //if it is the 1st filter, search DB
                            $data['sports'] = $this->sports_model->get_sports_byType($filterValue);
                            //then filter new list with the rest of filters
                        }
                        else{
                            //remove filter, then reapply with new filter
                        }
                    }
                }
                $this->filterArray["sport"] = $filterValue;
                $data['sports'] = $this->sports_model->get_sports_byType($filterValue);
            }
            elseif($filterType == "location"){
                $this->filterArray["location"] = $filterValue;
                $data['sports'] = $this->sports_model->get_sports_byLoc($filterValue);
            }
            $this->load->view('templates/results', $data);
        }
        
        private function filter($filterArray, $filterList){
            //pop filtered elements from filterArray into reservedArray
        }
        
        private function unfilter($filterArray, $filterList){
            //filter reserve array for the current filters and add to the filterArray
        }
        
}