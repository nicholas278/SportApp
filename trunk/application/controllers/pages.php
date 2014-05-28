<?php

class Pages extends CI_Controller {
    
        public function __construct()
            {
		parent::__construct();
                $this->load->model('sports_model');
                $this->load->helper('url');
                $this->load->library('session');
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
            $filterValue = $this->input->post('filterValue');
            $data['currentLat'] = $this->input->post('currentLat');
            $data['currentLng'] = $this->input->post('currentLng');
            $data['sortByDist'] = $this->input->post('sortByDist');
            if($filterValue != NULL){
                $data['sports'] = $this->sports_model->get_sports('sport', $filterValue);
            }
            else{
                $data['sports'] = $this->sports_model->get_sports();
            }            
            $this->load->view('templates/results', $data);
	}
        
        public function add_filter(){
            //Get input
            $filterType = $this->input->post('filterType');
            $filterValue = $this->input->post('filterValue');            
            //Add filter to the list
            $data['filtersList'] = $this->add_filterslist($filterType, $filterValue);
            //Find filter position and get list accordingly
            $filterIndex = $this->check_filterslist($filterType);           
            $data['sports'] = $this->get_list($filterIndex);
            $this->load->view('templates/results', $data);
        }
        
        public function remove_filter(){
            //Get input
            $removeType = $this->input->post('removeType');
            //Find filter position
            $filterIndex = $this->check_filterslist($removeType);
            //Remove filter from list first before getting the list
            $data['filtersList'] = $this->remove_filterslist($removeType);
            $data['sports'] = $this->get_list($filterIndex);
            $this->load->view('templates/results', $data);
        }
        
        private function get_list($filterIndex){
            $filtersList = $this->session->userdata('filtersList');
            //Only get from DB if the filter is not existant, or if the first filter is being changed
            if($filterIndex === FALSE || sizeof($filtersList) === 0){
                return FALSE;
            }
            else if($filterIndex === 0){              
                $reservedList = $this->sports_model->get_sports(reset(array_flip($filtersList)), reset($filtersList));
                $this->session->set_userdata('reservedList', $reservedList);
            }
            else{
                $reservedList = $this->session->userdata('reservedList');
            }
            return $this->filter_list($reservedList);
        }
        
        //Check filtersList for the request filter, return position of key of exist, otherwise return FALSE
        private function check_filterslist($filterType){
            $list = $this->session->userdata('filtersList');
            if($list === FALSE){
                return FALSE;
            }
            else if(array_key_exists($filterType, $list)){
                return array_search($filterType, array_keys($list));
            }
            return FALSE;
        }
        
        private function add_filterslist($filterType, $filterValue){
            $list = $this->session->userdata('filtersList');
            $list[$filterType] = $filterValue;
            $this->session->set_userdata('filtersList', $list);
            return $list;
        }
        
        private function remove_filterslist($filterType){
            $list = $this->session->userdata('filtersList');
            unset($list[$filterType]);
            $this->session->set_userdata('filtersList', $list);
            return $list;
        }
        
        private function filter_list($filterFrom){
            $resultList = [];
            $filtersList = $this->session->userdata('filtersList'); 
            $length = sizeof($filterFrom);
            for($i=0; $i<$length; $i++){
                $list = array_intersect($filterFrom[$i], $filtersList);
                if(sizeof($list) === sizeof($filtersList)){
                    array_push($resultList, $filterFrom[$i]);
                }
            }
            return $resultList;
        }

        
}