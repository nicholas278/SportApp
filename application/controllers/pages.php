<?php

class Pages extends CI_Controller {

        public function __construct()
            {
		parent::__construct();
		$this->load->helper('html');
                link_tag('localhost:8080/SportApp/application/views/css/style.css');
            }
            
	public function view($page = 'home')
	{     
            if ( ! file_exists('application/views/pages/'.$page.'.php'))
            {
                // Whoops, we don't have a page for that!
                show_404();
            }
                
            $data['title'] = ucfirst($page); // Capitalize the first letter
            $data['base']  = $this->config->item('base_url');
            $data['css']   = $this->config->item('css');   
            
            $this->load->view('templates/header', $data);
            $this->load->view('pages/'.$page, $data);
            $this->load->view('templates/footer', $data);
	}
}