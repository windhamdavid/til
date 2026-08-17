# InvoicePlane

## About

I use InvoicePlane for my client invoicing. Self-hosted CodeIgniter app, no
subscription and nobody else holding my billing history.

[https://invoice.davidwindham.com](https://invoice.davidwindham.com)  
[https://davidwindham.com/code/InvoicePlane](https://davidwindham.com/code/InvoicePlane)  
~~[https://sandbox.davidwindham.com/invoice/](https://sandbox.davidwindham.com/invoice/)~~

## Log

- 26/08/07 - upgraded 1.5.11 → 1.7.1, moved the vhost from PHP 7.4 → 8.3

## Repos

- [https://invoiceplane.com](https://invoiceplane.com)
- [https://github.com/InvoicePlane/InvoicePlane](https://github.com/InvoicePlane/InvoicePlane)
- [https://wiki.invoiceplane.com/en/1.5](https://wiki.invoiceplane.com/en/1.5)
- [https://wiki.invoiceplane.com/en/1.6](https://wiki.invoiceplane.com/en/1.6)

## Notes

- 1.5.11 → 1.7.1 goes in one pass. The release ships every migration from
  `000_1.0.0.sql` to `041_1.7.0.sql` and applies whatever isn't already in
  `ip_versions`. No need to stage through 1.6.
- Version lives in the database, not the code. To tell what a checkout is, look
  at the highest file in `application/modules/setup/sql/`.
- Wiki says PHP `<= 8.1` and the Dockerfile is `php:8.1-fpm`, but `composer.json`
  has no `php` constraint and their CI tests 8.2/8.3/8.4. Fine on 8.3.
- **`ipconfig.php` header changed.** 1.5.11 used phpdotenv v2, 1.7.1 uses v5,
  which chokes on the bare PHP guard — white screen, `InvalidFileException`.
  Needs the `# ` in front:

```shell
<?php exit('No direct script access allowed'); ?>      # 1.5.11
# <?php exit('No direct script access allowed'); ?>    # 1.7.1
```

- **`CI_ENV=production` is required.** `index.php` defaults `ENVIRONMENT` to
  `development`, which force-enables `display_errors` and overrides php.ini —
  stack traces in public. The 1.5.11 config predates the key, so editing the old
  file in place leaves it out. Better to start from the 1.7.1 file and paste the
  old values in.
- Keep `ENCRYPTION_KEY` identical or stored encrypted values stop decrypting.
- `LEGACY_CALCULATION=true` keeps pre-1.6.3 VAT math so old invoice totals don't
  move. Simple mode is only for EU e-invoicing.
- Setup's prerequisite screen checks PHP >= 5.6 and `date.timezone` and nothing
  else — it never checks extensions. Verify `gd`/`bcmath`/`intl` against the FPM
  pool yourself, not the CLI.
- Release zip bundles `vendor/`, so no composer on the host. Only custom files
  were `assets/core/css/custom.css`, `custom-pdf.css` and the favicon.
