<?php

class admin extends CI_Controller {
    
    public function __construct()
    {
        parent::__construct();
        $this->load->helper(array('form', 'url'));
        $this->load->library('form_validation');
        $this->load->library('security');
        $this->load->library('tank_auth');
        if(!$this->tank_auth->is_logged_in()){
            redirect('/auth/login');
        }
        $this->load->model('sports_model');
        $this->load->helper('url');
    }
    
    public function index(){

        $data['title'] = "Admin Panel"; // Capitalize the first letter 
        
        $this->load->view('templates/headeradmin', $data);
        $this->load->view('templates/menu', $data);
        $this->load->view('pages/dbedit', $data);
        
    }
    
    public function createDBItem(){
        $sportLocation['sport'] = $this->input->post('sport');
        $sportLocation['name'] = $this->input->post('name');
        $sportLocation['address'] = $this->input->post('address');
        $sportLocation['city'] = $this->input->post('city');
        $sportLocation['province'] = $this->input->post('province');
        $sportLocation['country'] = $this->input->post('country');
        $sportLocation['postal_code'] = $this->input->post('postal_code');
        $sportLocation['latitude'] = $this->input->post('latitude');
        $sportLocation['longitude'] = $this->input->post('longitude');
        $this->sports_model->set_sports($sportLocation);
    }
    
}
    