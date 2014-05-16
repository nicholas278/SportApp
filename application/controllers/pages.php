<?php

class Pages extends CI_Controller {

        public function __construct()
            {
		parent::__construct();
                $this->load->model('sports_model');
            }
            
        public function index($page = 'home'){            
            //$data['sports'] = $this->sports_model->get_sports();
            
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
}