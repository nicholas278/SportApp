<?php

class ui extends CI_Controller {
    
        public function __construct()
            {
		parent::__construct();
                $this->load->model('sports_model');
                $this->load->helper('url');
                $this->load->library('session');
            }
            
        public function index(){                      
            if ( ! file_exists('application/views/pages/home.php'))
            {
                // Whoops, we don't have a page for that!
                show_404();
            }
            
            $data['title'] = 'Home'; // Capitalize the first letter 
            
            $this->load->view('templates/header', $data);
            $this->load->view('templates/menu', $data);
            $this->load->view('pages/home', $data);
            $this->load->view('templates/footer');
        }
        
        public function view($page = 'home'){                      
            if ( ! file_exists('application/views/pages/'.$page.'.php'))
            {
                // Whoops, we don't have a page for that!
                show_404();
            }
            
            $data['title'] = ucfirst($page); // Capitalize the first letter 
            
            $this->load->view('pages/'.$page, $data);
            $this->session->sess_destroy();
        }   
        
        //The Current Location button takes the current coords, then calculate and sort the current list by distance
	public function current_location(){   
            $filterValue = $this->input->post('filterValue');
            $currentLat = $this->input->post('currentLat');
            $currentLng = $this->input->post('currentLng');
            
            $reservedList = $this->session->userdata('reservedList');
            if($reservedList === false){
                $reservedList = $this->get_list($searchValue);
            }
            $reservedList = $this->sort_list_byDist($reservedList, $currentLat, $currentLng);
            $this->get_page($reservedList, 1); //Hardcode workaround, will improve later
            $data['sports'] = $reservedList;
            $data['filtersList'] = $this->session->userdata('filtersList');
            $data['currentPage'] = $this->session->userdata('currentPage');
            $data['maxPage'] = $this->session->userdata('maxPage');
            $this->session->set_userdata('reservedList', $reservedList);
            $this->load->view('templates/results', $data);
	}
        
        //The search bar function
        public function search(){   
            $currentLat = $this->input->post('currentLat');
            $currentLng = $this->input->post('currentLng');
            $searchValue = $this->input->post('searchValue');
            $this->session->set_userdata('filtersList', false);
            $reservedList = $this->get_list($searchValue);
            $reservedList = $this->sort_list_byDist($reservedList, $currentLat, $currentLng);
            $this->get_page($reservedList, 1); //Hardcode workaround, will improve later
            $data['sports'] = $reservedList;
            $data['filtersList'] = '';
            $data['currentPage'] = $this->session->userdata('currentPage');
            $data['maxPage'] = $this->session->userdata('maxPage');
            $this->session->set_userdata('reservedList', $reservedList);
            $this->load->view('templates/results', $data);
	}
        
        //Add filter when the left bar is clicked
        public function add_filter(){
            //Get input
            $filterType = $this->input->post('filterType');
            $filterValue = $this->input->post('filterValue');
            //Add filter to the list
            $data['filtersList'] = $this->add_filterslist($filterType, $filterValue);
            //Find filter position and get list accordingly
            //$filterIndex = $this->check_filterslist($filterType);           
            $data['sports'] = $this->get_list();
            $data['currentPage'] = $this->session->userdata('currentPage');
            $data['maxPage'] = $this->session->userdata('maxPage');
            $this->load->view('templates/results', $data);
        }
        
        //Remove filter when the filter is deleted
        public function remove_filter(){
            //Get input
            $removeType = $this->input->post('removeType');
            //Find filter position
            //$filterIndex = $this->check_filterslist($removeType);
            //Remove filter from list first before getting the list
            $data['filtersList'] = $this->remove_filterslist($removeType);
            $data['sports'] = $this->get_list();
            $data['currentPage'] = $this->session->userdata('currentPage');
            $data['maxPage'] = $this->session->userdata('maxPage');
            $this->load->view('templates/results', $data);
        }
        
        public function sort_list(){
            $sortBy = $this->input->post('sortBy');
            $reservedList = $this->session->userdata('reservedList');
            if($sortBy === "alphabet"){
                 $reservedList = $this->sort_list_byName($reservedList);
            }
            else if($sortBy === "distance"){
                
            }
            $this->session->set_userdata('reservedList', $reservedList);
            $data['filtersList'] = $this->session->userdata('filtersList');
            $data['sports'] = $this->get_page($reservedList, 1);
            $data['currentPage'] = $this->session->userdata('currentPage');
            $data['maxPage'] = $this->session->userdata('maxPage');
            $this->load->view('templates/results', $data);
        }
        
        //Page control
        public function next_page(){
            $currentPage = $this->session->userdata('currentPage');
            $data['filtersList'] = $this->session->userdata('filtersList');
            $data['sports'] = $this->get_page($this->session->userdata('reservedList'), $currentPage+1);
            $data['currentPage'] = $this->session->userdata('currentPage');
            $data['maxPage'] = $this->session->userdata('maxPage');
            $this->load->view('templates/results', $data);
        }
        
        public function previous_page(){
            $currentPage = $this->session->userdata('currentPage');
            $data['filtersList'] = $this->session->userdata('filtersList');
            $data['sports'] = $this->get_page($this->session->userdata('reservedList'), $currentPage-1);
            $data['currentPage'] = $this->session->userdata('currentPage');
            $data['maxPage'] = $this->session->userdata('maxPage');
            $this->load->view('templates/results', $data);
        }
        
        public function first_page(){
            $data['filtersList'] = $this->session->userdata('filtersList');
            $data['sports'] = $this->get_page($this->session->userdata('reservedList'), 1);
            $data['currentPage'] = 1;
            $data['maxPage'] = $this->session->userdata('maxPage');
            $this->load->view('templates/results', $data);
        }
        
        public function last_page(){
            $data['filtersList'] = $this->session->userdata('filtersList');
            $reservedList = $this->session->userdata('reservedList');
            $data['sports'] = $this->get_page($reservedList, ceil(sizeof($reservedList)/10));
            $data['currentPage'] = $this->session->userdata('currentPage');
            $data['maxPage'] = $this->session->userdata('maxPage');
            $this->load->view('templates/results', $data);
        }
        
        private function get_list($searchValue = FALSE){
            $filtersList = $this->session->userdata('filtersList');
            $reservedList = $this->sports_model->get_sports(FALSE, $searchValue);

            if($filtersList !== false){
                $reservedList = $this->filter_list($reservedList);
            }
            $this->session->set_userdata('reservedList', $reservedList);
            return $this->get_page($reservedList, 1);
        }
        
        private function get_page($list, $pageNumber){
            $this->session->set_userdata('currentPage', $pageNumber);
            $this->session->set_userdata('maxPage', ceil(sizeof($list)/10));
            return array_slice($list, ($pageNumber - 1)*10, 10);
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
        
        private function filter_byDist($filterFrom, $dist = 7){
                $result = array_filter($filterFrom, function($var) use($dist){
                return($var['distance'] < $dist);
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
        
        private function sort_list_byName($list){
            usort($list, function($a, $b){
                return strcmp($a['name'], $b['name']);
            });
            return $list;
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