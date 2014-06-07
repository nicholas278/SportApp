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
            
            $this->session->set_userdata('filtersList', FALSE);
            $data['title'] = ucfirst($page); // Capitalize the first letter 
            
            $this->load->view('templates/header', $data);
            $this->load->view('pages/'.$page, $data);
            $this->load->view('templates/footer', $data);
        }    
            
	public function current_location(){   
            $filterValue = $this->input->post('filterValue');
            $currentLat = $this->input->post('currentLat');
            $currentLng = $this->input->post('currentLng');
            
            $reservedList = $this->session->userdata('reservedList');
            $reservedList = $this->sort_list_byDist($reservedList, $currentLat, $currentLng);
            $data['sports'] = $reservedList;
            $data['filtersList'] = $this->session->userdata('filtersList');
            $this->session->set_userdata('reservedList', $reservedList);
            $this->load->view('templates/results', $data);
	}
        
        public function search(){   
            $currentLat = $this->input->post('currentLat');
            $currentLng = $this->input->post('currentLng');
            $searchValue = $this->input->post('searchValue');
            
            $reservedList = $this->get_list($searchValue);
            $reservedList = $this->sort_list_byDist($reservedList, $currentLat, $currentLng);
            $data['sports'] = $reservedList;
            $data['filtersList'] = $this->session->userdata('filtersList');
            $this->session->set_userdata('reservedList', $reservedList);
            $this->load->view('templates/results', $data);
	}
        
        public function add_filter(){
            //Get input
            $filterType = $this->input->post('filterType');
            $filterValue = $this->input->post('filterValue');            
            //Add filter to the list
            $data['filtersList'] = $this->add_filterslist($filterType, $filterValue);
            //Find filter position and get list accordingly
            //$filterIndex = $this->check_filterslist($filterType);           
            $data['sports'] = $this->get_list();
            $this->load->view('templates/results', $data);
        }
        
        public function remove_filter(){
            //Get input
            $removeType = $this->input->post('removeType');
            //Find filter position
            //$filterIndex = $this->check_filterslist($removeType);
            //Remove filter from list first before getting the list
            $data['filtersList'] = $this->remove_filterslist($removeType);
            $data['sports'] = $this->get_list();
            $this->load->view('templates/results', $data);
        }
        
        private function get_list($searchValue = FALSE){
            $filtersList = $this->session->userdata('filtersList');
            //Only get from DB if the filter is not existant, or if the first filter is being changed
            //if($filterIndex === FALSE || sizeof($filtersList) === 0){
            $reservedList = $this->sports_model->get_sports(FALSE, $searchValue);
            //}
            //else if($filterIndex === 0){              
            //    $reservedList = $this->sports_model->get_sports(array(reset(array_flip($filtersList)) => reset($filtersList)));
            //}
            //else{
            //    $reservedList = $this->session->userdata('reservedList');
            //}
            if($filtersList !== false){
                $reservedList = $this->filter_list($reservedList);
            }
            $this->session->set_userdata('reservedList', $reservedList);
            return $reservedList;
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
        
        private function filter_byDist($filterFrom){
            $result = array_filter($filterFrom, function($var){
                return($var['distance'] < 10);
            });
            return $result;
        }
        
        private function sort_list_byDist($list, $lat, $lng){
            for($i=0;$i<sizeof($list);$i++){
                $list[$i]['distance'] = $this->distance($list[$i]['latitude'], $list[$i]['longitude'], $lat, $lng);
            }
            usort($list, function($a, $b){
                if ($a['distance'] == $b['distance']){
                    return 0;
                }
                else if ($a['distance'] > $b['distance']){
                    return 1;
                }
                else {return -1;}
            });
            return $this->filter_byDist($list);
        }
        
        private function distance($lat1, $lon1, $lat2, $lon2) {
            $theta = $lon1 - $lon2;
            $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
            $dist = acos($dist);
            $dist = rad2deg($dist);
            $miles = $dist * 60 * 1.1515;
            return ($miles * 1.609344);
        }

}