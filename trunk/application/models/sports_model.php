<?php
class Sports_model extends CI_Model {

	public function __construct()
	{
            $this->load->database();
	}

        public function get_sports($type = FALSE)
        {
            if ($type === FALSE)
            {
                    $query = $this->db->get('sportslist');
                    return $query->result_array();
            }

            $query = $this->db->get_where('sportslist', array('type' => $type));
            return $query->row_array();
        }
        
        public function set_sports()
        {
            //$this->load->helper('url');
            //$slug = url_title($this->input->post('title'), 'dash', TRUE);

            $data = array(
                    'type' => $this->input->post('type'),
                    'name' => $this->input->post('name'),
                    'address' => $this->input->post('address')
            );

            return $this->db->insert('sportsapp', $data);
        }
        
}

